import { InferenceHTTPClient } from '@roboflow/inference-sdk/api';

app.post('/api/init-webrtc', async (req, res) => {
  const { offer, wrtcparams } = req.body;

  // API key stays secure on the server
  const client = InferenceHTTPClient.init({
    apiKey: process.env.ROBOFLOW_API_KEY
  });

  const answer = await client.initializeWebrtcWorker({
    offer,
    workspaceName: wrtcparams.workspaceName,
    workflowId: wrtcparams.workflowId,
    config: {
      imageInputName: wrtcparams.imageInputName,
      streamOutputNames: wrtcparams.streamOutputNames,
      dataOutputNames: wrtcparams.dataOutputNames
    }
  });

  res.json(answer);
});