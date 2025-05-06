// component
import {
  NoUserOnly,
} from '@/components';
import {
  ForgotPasswordScreen,
} from "@/screens"

const AuthPage: React.FC = () => {
 return (
    <NoUserOnly>
      <ForgotPasswordScreen />
    </NoUserOnly>
  );
};

export default AuthPage;

