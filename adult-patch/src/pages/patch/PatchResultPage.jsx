import {
  Navigate,
  useParams,
} from "react-router";

function PatchResultPage() {
  const { patchId } = useParams();

  if (!patchId) {
    return <Navigate to="/explore" replace />;
  }

  return (
    <Navigate
      to={`/patch/${patchId}?step=2`}
      replace
    />
  );
}

export default PatchResultPage;