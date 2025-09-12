import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios'
import { serverUrl } from '../../App';
import { setLectureData } from '../../redux/lectureSlice';
import toast from 'react-hot-toast';

const EditLecture = () => {
  const { courseId, lectureId } = useParams();
  const { lectureData } = useSelector((state) => state.lecture);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedLecture = lectureData?.find((lecture) => lecture._id === lectureId);

  // fallback values
  const [lectureTitle, setLectureTitle] = useState(selectedLecture?.lectureTitle || "");
  const [videoUrl, setVideoUrl] = useState('');
  const [isPreviewFree, setIsPreviewFree] = useState(selectedLecture?.isPreviewFree || false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  if (!selectedLecture) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ClipLoader size={30} color="black" />
        <p className="ml-2">Loading lecture...</p>
      </div>
    );
  }

  const formData = new FormData();
  formData.append("lectureTitle", lectureTitle);
  formData.append("videoUrl", videoUrl);
  formData.append("isPreviewFree", isPreviewFree);

  const handleEditLecture = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/course/editlecture/${lectureId}`,
        formData,
        { withCredentials: true }
      );
      dispatch(setLectureData([...lectureData, res.data.lecture]));
      toast.success("Lecture Updated Successfully");
      navigate('/courses');
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeLecture = async (e) => {
    e.preventDefault();
    setLoading1(true);
    try {
      const res = await axios.delete(
        `${serverUrl}/api/course/removelecture/${lectureId}`,
        { withCredentials: true }
      );
     // remove lecture from redux state
    dispatch(setLectureData(
      lectureData.filter((lecture) => lecture._id !== lectureId)
    ));
      toast.success(res.data.message);
      navigate(`/createlecture/${courseId}`);
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    } finally {
      setLoading1(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6'>

        {/* Header */}
        <div className='flex items-center gap-2 mb-2'>
          <FaArrowLeftLong
            className='text-gray-600 cursor-pointer'
            onClick={() => navigate(`/createlecture/${courseId}`)}
          />
          <h2 className='text-xl font-semibold text-gray-800'>
            Update Course Lecture
          </h2>
        </div>

        <button
          className='mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm'
          onClick={removeLecture}
          disabled={loading1}
        >
          {loading1 ? <ClipLoader color='white' size={15} /> : 'Remove Lecture'}
        </button>

        <div className='space-y-4'>
          <div>
            <label
              htmlFor='lectureTitle'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Lecture Title <span className='text-red-600'>*</span>
            </label>
            <input
              id='lectureTitle'
              onChange={(e) => setLectureTitle(e.target.value)}
              value={lectureTitle}
              type="text"
              className='w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black'
              required
            />
          </div>

          <div>
            <label
              htmlFor='videoUrl'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Video <span className='text-red-600'>*</span>
            </label>
            <input
              id='videoUrl'
              onChange={(e) => setVideoUrl(e.target.files[0])}
              type="file"
              className='w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-500'
              required
              accept='video/*'
            />
          </div>

          <div className='flex items-center gap-3'>
            <input
              onChange={() => setIsPreviewFree(prev => !prev)}
              type="checkbox"
              className='accent-black h-4 w-4'
              id='isFree'
              checked={isPreviewFree}
            />
            <label htmlFor="isFree" className='text-sm font-medium text-gray-700'>
              Is This Video FREE
            </label>
          </div>

          {loading && <p>Uploading Video... Please Wait.</p>}
        </div>

        <div className='pt-4'>
          <button
            className='w-full bg-black text-white py-3 rounded-md text-sm font-medium text-center hover:text-white border-2 border-black transition cursor-pointer'
            onClick={handleEditLecture}
            disabled={loading}
          >
            {loading
              ? <ClipLoader color='white' loading={loading} size={20} />
              : 'Update Lecture'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditLecture
