import Container from "@/components/Container";
import Layout from "@/components/Layout";
import Typography from "@/components/Typography";
import Carousel, { Modal, ModalGateway } from "react-images";
import React, { useCallback, useState } from "react";
import Gallery from "react-photo-gallery-next";

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

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return <Layout className="bg-zinc-100 min-h-screen">
        <Container className="py-12 ">
            <Typography variant="h3" wrapper="h1" className="mb-6">Framing Moments</Typography>


            {gallery.length > 0 && <Gallery photos={gallery} onClick={openLightbox} />}


            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={gallery.map(x => ({
                                ...x,
                                srcset: x.srcSet,
                                caption: x.title
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>

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
