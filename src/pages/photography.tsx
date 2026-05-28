import Container from "@/components/Container";
import Layout from "@/components/Layout";
import React, { useState } from "react";
import { PhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import HeadWithMetas from "@/components/HeadWithMetas";
import Footer from "@/components/Footer";

type PhotographyProps = {
  photos: any[];
};

const Photography: React.FC<PhotographyProps> = ({ photos }) => {
  const [gallery, setGallery] = React.useState<any[]>([]);

  React.useEffect(() => {
    setGallery(
      photos.map((photo) => ({
        src: photo.urls.regular,
        width: photo.width,
        height: photo.height,
        alt: photo.alt_description || "Photo by Uday Vatti",
      })),
    );
  }, [photos]);

  const [index, setIndex] = useState(-1);

  return (
    <Layout className="bg-white dark:bg-neutral-950 min-h-screen">
      <HeadWithMetas
        title="Photography | Uday Vatti"
        description="A collection of moments captured through my lens — cars, cities, and light. Photography by Uday Vatti."
        url="https://udayvatti.com/photography"
        image="/images/uv-port.png"
      />
      <Container>
        <div className="pt-32 pb-12 md:pt-40">
          <div className="max-w-4xl">
            <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-8">
              Photography
            </p>
            <h1
              className="font-display leading-[0.92] tracking-tight text-neutral-900 dark:text-neutral-100 mb-8"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Framing Moments
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-md leading-relaxed mb-2">
              Photography is my way of slowing down.
            </p>
          </div>
        </div>
        <div className="pb-20">
          {gallery.length > 0 && (
            <PhotoAlbum
              layout="columns"
              photos={gallery}
              spacing={10}
              columns={(containerWidth) => {
                if (containerWidth < 640) return 1;
                if (containerWidth < 1024) return 2;
                return 3;
              }}
              onClick={({ index }) => setIndex(index)}
            />
          )}

          <Lightbox
            slides={gallery}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
          />
        </div>
      </Container>

      <Footer />
    </Layout>
  );
};

export async function getStaticProps() {
  const apiKey = process.env.UNSPLASH_API_KEY;
  try {
    const res = await fetch(
      "https://api.unsplash.com/users/vatteu23/photos?per_page=20",
      {
        headers: {
          Authorization: `Client-ID ${apiKey}`,
        },
      },
    );
    const photos = await res.json();
    return {
      props: {
        photos: Array.isArray(photos) ? photos : [],
      },
    };
  } catch {
    return { props: { photos: [] } };
  }
}

export default Photography;
