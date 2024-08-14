import {
  Content,
  RootLayout,
  Sidebar,
  DraggableTopBar,
  ActionButtonRow,
  NotePreviewList,
  MarkdownEditor,
  FloatingNoteTitle
} from '@/components'
import { useRef } from 'react'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }
  return (
    <div className="rounded-md">
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2 backdrop-blur-md">
          <ActionButtonRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll}/>
        </Sidebar>
        <Content ref={contentContainerRef} className="border-l bg-black border-l-white/20">
          <FloatingNoteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </div>
  )
}

export default App
