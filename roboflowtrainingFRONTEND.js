import { connectors, webrtc, streams } from '@roboflow/inference-sdk';

// Use proxy endpoint instead of direct API key
const connector = connectors.withProxyUrl('/api/init-webrtc');

const stream = await streams.useCamera({ video: true });
const connection = await webrtc.useStream({
  source: stream,
  connector,
  wrtcParams: { /* ... */ }
});
