import Container from "@/components/Container";
import Layout from "@/components/Layout";
import Typography from "@/components/Typography";
import React, { useCallback, useState } from "react";
import { PhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import HeadWithMetas from "@/components/HeadWithMetas";

type PhotographyProps = {
  photos: any[];
};

const Photography: React.FC<PhotographyProps> = (props: PhotographyProps) => {
  const { photos } = props;

  const [gallery, setGallery] = React.useState<any[]>([]);

  React.useEffect(() => {
    setGallery(
      photos.map((photo) => {
        return {
          src: photo.urls.regular,
          width: photo.width,
          height: photo.height,
        };
      })
    );
  }, [photos]);

  const [index, setIndex] = useState(-1);

  return (
    <Layout className="bg-stone-100 min-h-screen">
      <HeadWithMetas
        title="Photography | Uday Vatti"
        description="A collection of moments captured through my lens. Photography portfolio by Uday Vatti."
        url="https://udayvatti.com/photography"
        image="/images/uv-port.png"
      />
      <Container>
        <div className="py-20 md:py-32">
          <div className="max-w-4xl">
            <Typography
              variant="h5"
              fontWeight="semibold"
              className="mb-6 text-gray-600 tracking-wide uppercase"
              fontFamily="mono"
            >
              Photography
            </Typography>
            <Typography
              variant="h1"
              className="!leading-tight mb-8 text-gray-900"
              fontWeight="bold"
              fontFamily="display"
            >
              Framing Moments
            </Typography>
            <Typography
              variant="h5"
              fontWeight="normal"
              className="mb-12 text-gray-700 max-w-2xl leading-loose"
              fontFamily="primary"
            >
              Capturing life's fleeting moments through the lens, one frame at a
              time
            </Typography>
          </div>
        </div>
        <div className="pb-20">
          {gallery.length > 0 && (
            <PhotoAlbum
              layout="columns"
              photos={gallery}
              spacing={12}
              columns={(containerWidth) => {
                if (containerWidth < 640) return 1;
                if (containerWidth < 1024) return 2;
                return 3;
              }}
              className="mt-12"
              onClick={({ index }) => setIndex(index)}
            />
          )}

          <Lightbox
            slides={gallery}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            // enable optional lightbox plugins
            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
          />
        </div>
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  // Fetch photos from Unsplash API
  const res = await fetch(
    "https://api.unsplash.com/users/vatteu23/photos?per_page=10",
    {
      headers: {
        Authorization: "Client-ID xpIrXtl19hTth19Cl3Jq2urUKymQiTI_BtM617npZMY",
      },
    }
  );
  const photos = await res.json();
  return {
    props: {
      photos: photos,
    },
  };
}

export default Photography;
