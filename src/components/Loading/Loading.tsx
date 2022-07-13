import "./Loading.scss";

export interface LoadingProps {}

export default function Loading(props: LoadingProps) {
  return (
    <div id="Loading">
      <div className="spinner-border text-ligh" role="status" />
    </div>
  );
}
