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

}


const Photography: React.FC<PhotographyProps> = (props: PhotographyProps) => {
    const { photos } = props;

    const [gallery, setGallery] = React.useState<any[]>([]);

    React.useEffect(() => {
        setGallery(photos.map((photo) => {
            return {
                src: photo.urls.regular,
                width: photo.width,
                height: photo.height,
            };
        }));
    }, [photos]);

    const [index, setIndex] = useState(-1);

    return <Layout className="bg-zinc-100 min-h-screen">
        <HeadWithMetas
            title="Uday Vatti"
            description="Uday Vatti is a web developer and a designer at Labelbox."
            url="https://udayvatti.com"
        />
        <Container className="py-12 ">
            <Typography variant="h3" wrapper="h1" className="mb-6">Framing Moments</Typography>



            {gallery.length > 0 && <PhotoAlbum layout="columns" photos={gallery} spacing={5} onClick={({ index }) => setIndex(index)} />}

            <Lightbox
                slides={gallery}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                // enable optional lightbox plugins
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />

        </Container>
    </Layout>
};



export async function getStaticProps() {
    // Fetch photos from Unsplash API
    const res = await fetch('https://api.unsplash.com/users/vatteu23/photos?per_page=10', {
        headers: {
            Authorization: 'Client-ID xpIrXtl19hTth19Cl3Jq2urUKymQiTI_BtM617npZMY',
        },
    });
    const photos = await res.json();
    return {
        props: {
            photos: photos,
        },
    };
}


export default Photography;
