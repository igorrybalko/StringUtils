import { Button, Form, Input, Divider, notification, Table, Tag } from 'antd';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import chunk from 'lodash.chunk';

export default function TranslitUrlPage() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();

 const columns = [
    {
        title: 'From',
        dataIndex: 'from0',
        key: 'from0',
    },
    {
        title: 'To',
        dataIndex: 'to0',
        key: 'to0',
    },
    {
        title: '',
        dataIndex: 'space0',
        key: 'space0',
    },
    {
        title: 'From',
        dataIndex: 'from1',
        key: 'from1',
    },
    {
        title: 'To',
        dataIndex: 'to1',
        key: 'to1',
    },
    {
        title: '',
        dataIndex: 'space1',
        key: 'space1',
    },
    {
        title: 'From',
        dataIndex: 'from2',
        key: 'from2',
    },
    {
        title: 'To',
        dataIndex: 'to2',
        key: 'to2',
    },
    {
        title: '',
        dataIndex: 'space2',
        key: 'space2',
    },
    {
        title: 'From',
        dataIndex: 'from3',
        key: 'from3',
    },
    {
        title: 'To',
        dataIndex: 'to3',
        key: 'to3',
    },
    {
        title: '',
        dataIndex: 'space3',
        key: 'space3',
    },
    {
        title: 'From',
        dataIndex: 'from4',
        key: 'from4',
    },
    {
        title: 'To',
        dataIndex: 'to4',
        key: 'to4',
    },
    {
        title: '',
        dataIndex: 'space4',
        key: 'space4',
    },
    {
        title: 'From',
        dataIndex: 'from5',
        key: 'from5',
    },
    {
        title: 'To',
        dataIndex: 'to5',
        key: 'to5',
    },
 ];

 const converter = {

    'а' : 'a',   'б' : 'b',   'в' : 'v',
    'г' : 'g',   'д' : 'd',   'е' : 'e',
    'ё' : 'e',   'ж' : 'zh',  'з' : 'z',
    'и' : 'i',   'й' : 'y',   'к' : 'k',
    'л' : 'l',   'м' : 'm',   'н' : 'n',
    'о' : 'o',   'п' : 'p',   'р' : 'r',
    'с' : 's',   'т' : 't',   'у' : 'u',
    'ф' : 'f',   'х' : 'h',   'ц' : 'c',
    'ч' : 'ch',  'ш' : 'sh',  'щ' : 'sch',
    'ь' : '',    'ы' : 'y',   'ъ' : '',
    'э' : 'e',   'ю' : 'yu',  'я' : 'ya',
    'ї' : 'i',   '0': '0',    '1': '1',
    '2': '2',    '3': '3',    '4': '4',
    '5': '5',    '6': '6',    '7': '7',
    '8': '8',    '9': '9',    'a': 'a',
    'b': 'b',    'c':'c',     'd': 'd',
    'e': 'e',    'f': 'f',    'g': 'g',
    'h': 'h',    'i': 'i',    'j': 'j',
    'k': 'k',    'l': 'l',    'm': 'm',
    'n': 'n',    'o': 'o',    'p': 'p',
    'q': 'q',    'r': 'r',    's': 's',
    't': 't',    'u': 'u',    'v': 'v',
    'w': 'w',    'x': 'x',    'y': 'y',
    'z': 'z',    'ñ': 'n',    'ґ': 'g',
    'і': 'i'
};

const convArr = Object.entries(converter);
 const rawArr = chunk(convArr, 6);
 const dataSource = rawArr.map((el, i) => {

    return {
        key: i,
        from0: el[0][0],
        to0: el[0][1],
        space0: '',
        from1: el[1] ? el[1][0] : '',
        to1: el[1] ? el[1][1] : '',
        space1: '',
        from2: el[2] ? el[2][0] : '',
        to2: el[2] ? el[2][1] : '',
        space2: '',
        from3: el[3] ? el[3][0] : '',
        to3: el[3] ? el[3][1] : '',
        space3: '',
        from4: el[4] ? el[4][0] : '',
        to4: el[4] ? el[4][1] : '',
        space4: '',
        from5: el[5] ? el[5][0] : '',
        to5: el[5] ? el[5][1] : '',
      }
 })

 console.log(dataSource);


 function cyr2translit(cyrtext: string) {
    const symbols = ['-', '_', ' ', '+'];

    let str = cyrtext;

    str = str.trim().toLowerCase();

    let convStr = '';

    for(let i = 0; i< str.length; i++) {

        if(str[i] in converter) {
            convStr += converter[str[i] as keyof typeof converter];
        }else{
            if(symbols.includes(str[i])){
                convStr += '-';
            }
        }
    }

    return convStr;

}

 const onFinish = (val: { text: string }) => {

    const str = cyr2translit(val.text);
    setResult(str);
 };

 function copyText(){
  if(result.length){
    copy(result);
    api.success({
      message: 'Сopied',
    })
  }
 }

 return (
  <div>
    {contextHolder}
   <h1>Translit URL</h1>
   <Form onFinish={onFinish} autoComplete='off' layout='vertical'>
    <Form.Item
     name='text'
     rules={[{ required: true, message: 'Please enter data' }]}
    >
     <Input 
      placeholder='Type your text...' />
    </Form.Item>

    <Form.Item>
     <Button type='primary' htmlType='submit'>
        Submit
     </Button>
    </Form.Item>
   </Form>
   <Divider />
   <h2>Result:</h2>
   <div className='p-input mb-24'>{result}</div>
   <Button type='primary' onClick={copyText}>
      Copy
     </Button>
   <Divider />
   <div>
   Service transliteration of Cyrillic into Latin for URL (for SEF)
   </div>
   <Divider />
   <div>
        <h3>Rules:</h3>

        <div className="mb-24">
            <Tag>-</Tag>
            <Tag>_</Tag>
            <Tag>space</Tag>
            <Tag>+</Tag>
            are converted to <Tag>-</Tag>
        </div>
        <div className="mb-24">
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>

        
        

        <div>Other characters are ignored</div>
   </div>
  </div>
 );
}