import formatDuration from 'format-duration';

const formatTime = (timeInSeconds: number = 0) =>
  formatDuration(timeInSeconds * 1000);

const formatDate = (date: Date) =>
  date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export { formatTime, formatDate };
