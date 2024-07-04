import { PlusOutlined } from '@ant-design/icons';
import { ChatMessage, ProChat, ProChatInstance } from '@ant-design/pro-chat';
import { Button, Flex, GetProp, Image, Space, UploadFile, UploadProps } from 'antd';
import { useTheme } from 'antd-style';
import { useRef, useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function Chat() {
  const chatRef = useRef<ProChatInstance | undefined>(null);
  const theme = useTheme();

  const [moreType, setMoreType] = useState(null);
  const [moreTitle, setMoreTitle] = useState(null);
  const [loading, setLoading] = useState(false)
  const [fileList, setfileList] = useState<UploadFile[]>([])
  const [chats, setChats] = useState<ChatMessage<Record<string, any>>[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false)

  const onDrawerOpen = () => {
    setDrawerOpen(true)
  }
  const onDrawerClose = () => {
    // setfileList([])
    setDrawerOpen(false)
  }

  const onMoreDrawerOpen = () => {
    setfileList([])
    setMoreDrawerOpen(true)
  }
  const onMoreDrawerClose = () => {
    // setfileList([])
    setMoreDrawerOpen(false)
  }


  const onAvatarClick = (item: any) => {
    setMoreType(item.type)
    setDrawerOpen(false)
    setMoreDrawerOpen(true)
  }

  return (
    <div style={{ height: 740, width: 400, padding: 20,  }}>
      <div style={{ background: theme.colorBgLayout, }}>
        <ProChat
          style={{ height: 700, width: 360 }}
          loading={loading}
          // @ts-ignore
          chatRef={chatRef}
          // chats={chats}
          // onChatsChange={(_chats) => {
          //   setChats(_chats)
          // }}
          messageItemExtraRender={(message) => {
            if (message?.extra?.pictures) {
              return <Space style={{ margin: '10px 0px' }}>
                {message?.extra?.pictures.map((url: any) => <Image width={80} src={url} />)}
              </Space>
            }
          }}
          actions={{
            flexConfig: {
              style: { paddingLeft: 0, },
              gap: 24,
              direction: 'horizontal',
              justify: 'space-between',
            },
            render: (defaultDoms) => [
              // ...defaultDoms,
            ]
          }}
          inputAreaRender={(defaultDom, onMessageSend,) => {
            return (
              <Flex align='flex-end'>
                <div style={{ padding: '22px 10px', }}>
                  <Button type='primary' shape="circle" icon={<PlusOutlined />} onClick={onDrawerOpen} />
                </div>
                {defaultDom}
              </Flex>
            )
          }}
          request={async (messages) => {
            const _message = messages.slice(-1);
            const { id, content, extra } = _message[0] || {};
            if (id) {
              let _pictures = fileList.map(item => item.url)
              console.log('pictures', _pictures);
              chatRef.current?.setMessageContent(id, content + ' ')
              chatRef.current?.setMessageValue(id, 'extra', { pictures: _pictures })
            }
            setfileList([])
            const mockedData: string = `这是一段模拟的对话数据。本次会话传入了${messages.length}条消息`;
            return new Response(mockedData);
          }}

        />
        {/* <BackBottom target={chatRef as any}  /> */}
      </div>
    </div>
  );
}
