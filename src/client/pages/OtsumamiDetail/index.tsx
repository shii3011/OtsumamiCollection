import React from 'react';

interface OtsumamiDetailProps {
  name: string;
  imageUrl: string;
  description: string;
  link: string;
  category: string;
}

const OtsumamiDetail: React.FC<OtsumamiDetailProps> = ({ name, imageUrl, description, link, category }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md overflow-hidden p-6">
      <h1 className="text-2xl font-bold mb-2 text-orange-600">{name}</h1>
      <img src={imageUrl} alt={name} className="w-full h-64 object-cover rounded-md mb-4" />
      <p className="text-gray-700 mb-4">{description}</p>
      <p className="text-sm text-gray-500 mb-4">カテゴリー: {category}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
      >
        サイトで見る
      </a>
    </div>
  );
};

export default OtsumamiDetail; 
