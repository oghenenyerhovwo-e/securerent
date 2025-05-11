// component
import {
//   NoUserOnly,
} from '@/components';
import {
  EditListingScreen,
} from "@/screens"

const EditListingPage = ({ params }: { params: { _id: string } }) => {
 return (
    <>
      <EditListingScreen params={params} />
    </>
  );
};

export default EditListingPage;

