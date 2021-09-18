export default function TagsList({ tags, editMode }) {
  return <div>{tags && tags.map((tag) => <span key={tag}>{tag}</span>)}</div>;
}
