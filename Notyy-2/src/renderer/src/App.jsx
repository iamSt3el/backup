import { Content, Header, Navbar, NotesPreview, RootLayout } from './components'
import { AutoSave } from './hooks/AutoSave'

function App() {
  return (
    <>
      <AutoSave />
      <RootLayout>
        <Header>
          <Navbar />
        </Header>
        <Content>
          <NotesPreview />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
