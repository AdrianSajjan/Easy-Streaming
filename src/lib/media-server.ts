import NodeMediaServer from "node-media-server";
import { mediaServerConfig } from "../config/media-server";
import { User } from "../schema/User";
import { Video } from "../schema/Video";

const mediaServer = new NodeMediaServer(mediaServerConfig);

mediaServer.on("prePublish", async (id, streamPath, args) => {
  const streamKey = getStreamKeyFromStreamPath(streamPath);
  console.log("[NodeMediaEvent on PrePublish]", `streamKey=${streamKey} id=${id} path=${streamPath} args=${JSON.stringify(args)}`);

  try {
    const user = await User.findOne({ activeStreamKey: streamKey });
    if (!user) {
      const session: any = mediaServer.getSession(id);
      session.reject();
      console.log("[NodeMediaEvent on PrePublish]", `error = Invalid session - ${id}`);
    }

    const video = await Video.findOne({ streamKey });
    if (!video) {
      const session: any = mediaServer.getSession(id);
      session.reject();
      console.log("[NodeMediaEvent on PrePublish]", `error = Video not published - ${id}`);
    }
  } catch (error) {
    console.log("[NodeMediaEvent on PrePublish]", `streamKey=${streamKey} id=${id} path=${streamPath} error=${JSON.stringify(error)}`);
  }
});

const getStreamKeyFromStreamPath = (path: string) => {
  const parts = path.split("/");
  return parts[parts.length - 1];
};

export { mediaServer };
