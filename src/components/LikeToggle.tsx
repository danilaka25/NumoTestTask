import React from 'react';
import {TouchableOpacity} from 'react-native';
import INACTIVE from '$assets/icons/LikeInActive.svg';
import ACTIVE from '$assets/icons/LikeActive.svg';

interface LikeToggleProps {
  isLiked: boolean;
  onToggle: () => void;
  size?: number;
}

const LikeToggle: React.FC<LikeToggleProps> = ({
  isLiked,
  onToggle,
  size = 64,
}) => {
  const Icon = isLiked ? ACTIVE : INACTIVE;

  return (
    <TouchableOpacity onPress={onToggle}>
      <Icon width={size} height={size} />
    </TouchableOpacity>
  );
};

export default LikeToggle;
