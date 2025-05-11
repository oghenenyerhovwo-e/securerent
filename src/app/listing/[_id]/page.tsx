// component
import {
//   NoUserOnly,
} from '@/components';
import {
  ShowListingScreen,
} from "@/screens"

const ShowListingPage = ({ params }: { params: { _id: string } }) => {
 return (
    <>
      <ShowListingScreen params={params} />
    </>
  );
};

export default ShowListingPage;

