$(() => {
  console.log('ready')
  bindClickHandlers();
});

const bindClickHandlers = () => {
  $(".all_tools").on("click", (event) => {
    // event.preventDefault()
    console.log('hello')
  })
}
