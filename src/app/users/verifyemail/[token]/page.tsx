// component
import {
  NoUserOnly,
} from '@/components';
import {
  VerifyEmailScreen,
} from "@/screens"

const VerifyEmailPage = ({ params }: { params: { token: string } }) => {
 return (
    <NoUserOnly>
      <VerifyEmailScreen params={params} />
    </NoUserOnly>
  );
};

export default VerifyEmailPage;

