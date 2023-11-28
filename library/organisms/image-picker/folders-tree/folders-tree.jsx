import React, { useEffect, useRef } from 'react';
import { Tree } from 'react-arborist';
import { useDispatch } from 'react-redux';

import LoadingSpinner from 'library/atoms/loading-spinner/loading-spinner';

import { useGetLibraryFoldersQuery } from '../redux/images-manager-client';
import { setCurrentFolder } from '../redux/manager-slice';
import FolderNode from './folder-node';

export default function FoldersTree({ currentFolder, height }) {
    const dispatch = useDispatch();
    const { data, isLoading } = useGetLibraryFoldersQuery();
    const treeRef = useRef(null);

    useEffect(() => {
        if (currentFolder && data) {
            treeRef.current.open(currentFolder);
        }
    }, [treeRef.current, data]);

    if (isLoading || !data) {
        return <LoadingSpinner />;
    }

    function handleFolderActivation(folder) {
        dispatch(setCurrentFolder(folder.id));
    }

    return (
        <Tree
            selection={currentFolder}
            openByDefault={false}
            onActivate={handleFolderActivation}
            disableDrag
            rowClassName="folder-row"
            rowHeight={30}
            initialData={data}
            disableMultiSelection
            ref={treeRef}
            height={height}
        >
            {FolderNode}
        </Tree>
    );
}
