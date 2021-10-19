import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import type { DbCollection } from '../../lib/types/collection';
import type { Image } from '../../lib/types/image';

export default function useImageCollections(
  image: Image | null,
  userCollections: DbCollection[] | null
): {
  collections: DbCollection[] | null;
  addToCollection: (collection: DbCollection) => void;
  removeFromCollection: (collection: DbCollection) => void;
} {
  const queryClient = useQueryClient();
  const mutationAdd = useMutation(addImage);
  const mutationRemove = useMutation(removeImage);

  const imageData = useQuery(['image', image?.id], () => getImage(image?.id || ''), {
    retry: false,
    enabled: !!image,
  });
  const imageCollections = imageData.data?.data.result.collectionsList as DbCollection[];

  const collections = userCollections?.map((collection) => ({
    ...collection,
    hasSelectedImage: imageCollections?.some(
      (imageCollection) => imageCollection._id === collection._id
    ),
  }));

  async function addToCollection(collection: DbCollection): Promise<void> {
    if (!image || !collection._id) return;
    await mutationAdd.mutateAsync({ image, collectionId: collection._id });
    queryClient.invalidateQueries(['image', image?.id]);
    queryClient.invalidateQueries(['collections']);
    queryClient.invalidateQueries(['collectionImages', collection._id]);
  }

  async function removeFromCollection(collection: DbCollection): Promise<void> {
    if (!image?.id || !collection._id) return;
    await mutationRemove.mutateAsync({ imageId: image.id, collectionId: collection._id });
    queryClient.invalidateQueries(['image', image?.id]);
    queryClient.invalidateQueries(['collections']);
    queryClient.invalidateQueries(['collectionImages', collection._id]);
  }

  return { collections: collections || null, addToCollection, removeFromCollection };
}

async function getImage(imageId: string) {
  return await axios.get(`/api/images/${imageId}`);
}

async function addImage(addImageData: { image: Image; collectionId: string }): Promise<void> {
  const { image, collectionId } = addImageData;
  await axios.post(`/api/images/`, { collectionId, image });
}

async function removeImage(deleteImageData: {
  imageId: string;
  collectionId: string;
}): Promise<void> {
  const { imageId, collectionId } = deleteImageData;
  await axios.delete(`/api/images/`, { data: { collectionId, imageId } });
}
