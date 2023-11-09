import ContentLoader from "react-content-loader";

const PlayerLoader = (props) => (
  <ContentLoader
    speed={1}
    width={227}
    height={19}
    viewBox="0 0 227 19"
    backgroundColor="#d6d6d6"
    foregroundColor="#be70fc"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="0" width="227" height="19" />
  </ContentLoader>
);

export default PlayerLoader;
