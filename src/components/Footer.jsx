


const Footer = () => {
    const sourceCode = "https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js/"
    const courseUrl = "https://fullstackopen.com/"
    return(
      <div>
        Anecdote app for <a href={courseUrl}>Full Stack Open</a>.<br />
        See <a href={sourceCode}>{sourceCode}</a> for the source code.
      </div>
    )
  }

  export default Footer