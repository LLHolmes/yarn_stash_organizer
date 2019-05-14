$(() => {
  console.log('ready')
  bindClickHandlers();
});

const bindClickHandlers = () => {
  $(".js-tools").on("click", (event) => {
    event.preventDefault()
    console.log('hello')
  })
}
