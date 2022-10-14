import {cx} from '@emotion/css';

const Header = () => {
  const handleSave = (e) => {
    console.log(e);
  };

  const handlePreview = (e) => {
    console.log(e);
  };

  const handlePublish = (e) => {
    console.log(e);
  };

  return (
    <div className="w-full flex justify-between items-center gap-4">
      <h2
        className={cx(`w-full text-xl flex items-center justify-start gap-2`)}
      >
        Create Story
      </h2>
      <div className="flex items-center gap-2">
        <button
          className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
          onClick={handlePublish}
        >
          Preview
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default Header;
