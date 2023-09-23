import { Button } from './LoadMore.styled';

const LoadMore = ({ onClick }) => {
  return <Button type="button" onClick={() => onClick()}></Button>;
};

export default LoadMore;
