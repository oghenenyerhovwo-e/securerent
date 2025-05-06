// component
import {
  NoUserOnly,
} from '@/components';
import {
  ResetPasswordScreen,
} from "@/screens"

const ResetPaswwordPage = ({ params }: { params: { token: string } }) => {
 return (
    <NoUserOnly>
      <ResetPasswordScreen params={params} />
    </NoUserOnly>
  );
};

export default ResetPaswwordPage;

