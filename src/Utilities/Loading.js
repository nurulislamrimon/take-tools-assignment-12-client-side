import React from 'react';

const Loading = () => {
    return (
        <div class="h-[calc(100vh-130px)] flex items-center justify-center">
            <div class="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
        </div>
    );
};

export default Loading;