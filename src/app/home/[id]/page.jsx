import PhotoBuyerDetail from "@/components/PhotoBuyer/PhotoBuyerDetail";


export default function PhotoDetailPage({ params }) {
  return <PhotoBuyerDetail id={params.id} />;
}

