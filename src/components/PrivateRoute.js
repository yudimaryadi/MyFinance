import { Navigate } from 'react-router-dom';

function PrivateRoute({ session, children }) {
  if (!session) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;