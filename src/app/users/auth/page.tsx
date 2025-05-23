// component
import {
  NoUserOnly,
} from '@/components';
import {
  AuthScreen,
} from "@/screens"

const AuthPage: React.FC = () => {
 return (
    <NoUserOnly>
      <AuthScreen />
    </NoUserOnly>
  );
};

export default AuthPage;

