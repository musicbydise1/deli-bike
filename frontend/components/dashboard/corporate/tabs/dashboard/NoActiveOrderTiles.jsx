'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button/Button';
import { AiOutlineLoading } from 'react-icons/ai';
import Image from 'next/image';
import { useGetBikesQuery } from '@/store/services/bikesApi';

export default function NoActiveOrderTiles() {
  const { data, isLoading, error } = useGetBikesQuery();
  const bikes = Array.isArray(data?.data) ? data.data : [];
  if (error) console.error('Ошибка загрузки байков:', error);
  const [loadingBikeId, setLoadingBikeId] = useState(null);
  const router = useRouter();

  const handleRent = id => {
    setLoadingBikeId(id);
    router.push(`/bike/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <AiOutlineLoading size={50} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-1">Личный кабинет</h1>
      <p className="text-gray-600 mb-6">Выберите свой первый электросамокат</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {bikes.length === 0 ? (
          <div className="text-gray-500">Нет доступных байков для аренды</div>
        ) : (
          bikes.map(bike => (
            <div
              key={bike.id}
              className="border border-gray-200 rounded-lg p-4 flex flex-col items-center"
            >
              <div className="w-full h-40 mb-4 flex items-center justify-center">
                {bike.imageUrls && bike.imageUrls.length > 0 ? (
                  <Image src={bike.imageUrls[0]} alt={bike.name} className="h-full object-cover" />
                ) : (
                  <span className="text-gray-400">IMAGE</span>
                )}
              </div>

              <h2 className="text-lg font-semibold mb-2 uppercase">
                {bike.name} - {bike.model}
              </h2>

              <div className="w-full">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => handleRent(bike.id)}
                  disabled={loadingBikeId === bike.id}
                >
                  {loadingBikeId === bike.id ? (
                    <AiOutlineLoading className="animate-spin" />
                  ) : (
                    'Арендовать'
                  )}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
