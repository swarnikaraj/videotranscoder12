import {VideoListProps, VideoObject} from "../utils/type"

const VideoList:React.FC<VideoListProps>=({videos})=>{
return <div className=" place-items-center w-full   ">
      <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-transparent">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:text-sm"
          >
            Title
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:text-sm"
          >
            Type
          </th>
           <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:text-sm"
          >
            Size
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:text-sm"
          >
            Status
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:text-sm"
          >
            Preview
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:text-sm"
          >
            Created At
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:text-sm"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {videos.map((video: VideoObject) => (
          <tr key={video.id}>
            <td className="px-6 py-4 whitespace-nowrap">{video.title}</td>
            <td className="px-6 py-4 whitespace-nowrap">{video.type}</td>
            <td className="px-6 py-4 whitespace-nowrap">{video?.size} mb</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {video.status === 'processed' ? (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Processed
                </span>
              ) : (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Processing
                </span>
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button className="text-indigo-600 hover:text-indigo-900">Preview</button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{video.createdAt}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
              <button className="text-red-600 hover:text-red-900 ml-2">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
     </div>
     </div>
}

export default VideoList