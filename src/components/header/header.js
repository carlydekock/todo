export default function Header(props) {
  return(
    <header>
      <h2>
        There are {props.list.filter(item => !item.complete).length} Items To Complete
      </h2>
    </header>
  )
}