import express from 'express';
import * as bodyParser from 'body-parser';
import ParserUtil from './dataUtil/parserUtil';


const app = express();
app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.post('/api/v1/parse', async (req,res) => {

    const data: string = req.body.data;
    console.log('request data', req);
    const userInfo = await ParserUtil.ParseData(data, "1")
    console.log('userInfo ', userInfo);
    res.send({
        statusCode: 200,
        data: userInfo
    });
});

app.post('/api/v2/parse', async (req,res) => {
    const data: string = req.body.data;
    console.log('request data', req);
    const userInfo = await ParserUtil.ParseData(data, "2")
    console.log('userInfo ', userInfo);
    res.send({
        statusCode: 200,
        data: userInfo
    });
});

export {app};