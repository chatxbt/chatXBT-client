export default (ref: any) => {
    if (ref.current != null) {
        ref.current?.lastElementChild?.scrollIntoView();
    }
}