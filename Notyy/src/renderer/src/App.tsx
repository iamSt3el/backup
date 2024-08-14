import { AddButton, Content, Header, NavBar, RootLayout } from '@/components'

function App() {
  return (
    <div>
      <RootLayout>
        <Header>
          <NavBar />
        </Header>
        <Content>
          <AddButton />
        </Content>
      </RootLayout>
    </div>
  )
}

export default App
