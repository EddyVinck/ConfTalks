import conferences from "../../data/conferences.json";
import speakers from "../../data/speakers.json";
import talkCategories from "../../data/talk_categories.json";
import talks from "../../data/talks.json";
import { number } from "prop-types";

const getTalkList = () => {
  let combinedData: any = talks.talks;

  let temp = [];
  for (const talkId in combinedData) {
    if (combinedData.hasOwnProperty(talkId)) {
      const categories = combinedData[talkId].categories.map(
        catId => talkCategories.categories[catId]
      );
      const tData = { id: Number(talkId), ...combinedData[talkId], categories };
      temp.push(tData);
    }
  }

  // videos uploaded last come first
  // TODO: fix "Text content did not match" between server & client
  temp = temp.sort((a, b) => {
    const aDate = new Date(a.video_upload_date);
    const bDate = new Date(b.video_upload_date);
    return bDate.getTime() - aDate.getTime();
  });

  combinedData = temp;

  return combinedData;
};

export { getTalkList };
