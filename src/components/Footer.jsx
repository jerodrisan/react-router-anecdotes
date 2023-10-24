

export const Footer = () => {

    const gitHubUrl = 'https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'
    const fullstackopenUrl = 'https://fullstackopen.com/'
    return(      
      <div>
        Anecdote app for <a href={fullstackopenUrl}>Full Stack Open</a>.
        <br />
        See <a href={gitHubUrl}>{gitHubUrl}</a> for the source code.
      </div>
    )
  }