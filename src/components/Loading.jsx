import loadingStyles from "./loading.module.css";
function Loading() {
  return (
    <section>
      <span className={`${loadingStyles.loader}`}></span>
    </section>
  );
}

export default Loading;
