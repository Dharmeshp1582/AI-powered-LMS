import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa6';

const ReviewCard = ({ comment, rating, photoUrl, name, description, title }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 max-w-sm w-full border border-gray-100">
      
      {/* Course Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
       Review for:  <span className='px-2 py-0.5 bg-gray-100 rounded-full text-gray-700 capitalize'>{title}</span>
      </h3>

      {/* Stars */}
      <div className="flex items-center mb-4 text-yellow-400 text-base">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <span key={index}>
              {index < rating ? <FaStar /> : <FaRegStar />}
            </span>
          ))}
      </div>

      {/* Comment */}
      {comment && (
        <p className="text-gray-600 italic mb-5">
          “{comment}”
        </p>
      )}

      {/* User Info */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
        <img
          src={photoUrl || "/default-avatar.png"}
          alt={name || "User"}
          className="w-12 h-12 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h2 className="font-bold text-gray-800 text-sm">{name || "Anonymous"}</h2>
          <p className="text-xs text-gray-500">{description || ""}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
