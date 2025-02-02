import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

type Props = {
 content: string;
 name: string;
};

export default function DownloadBtn({ content, name }: Props) {
 const url = useMemo(() => {
  const rawFile = new File([content], name, {
   type: 'text/plain',
  });
  return URL.createObjectURL(rawFile);
 }, [content]);

 if (!content) {
  return null;
 }

 return (
  <Button icon={<DownloadOutlined />} type='primary' href={url} download={name}>
   Download
  </Button>
 );
}
