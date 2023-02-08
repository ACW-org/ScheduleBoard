import React, { useMemo } from "react";
import { useTable } from "react-table";
import { DndProvider, useDrag, useDrop, DragPreviewImage } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import CaseItem from "../Data/Case";
import styled from "styled-components";

const CaseTable = ({ handler }) => {
  const Styles = styled.div`
    display: block;
    max-width: 100%;

    .tableWrap {
      display: block;
      max-width: 100%;
      overflow-x: scroll;
      overflow-y: hidden;
      border-bottom: 1px solid black;
    }

    table {
      width: 100%;
      border-spacing: 0;
      tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }

      th,
      td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;

        /* The secret sauce */
        /* Each cell should grow equally */
        width: 1%;
        /* But "collapsed" cells should be as small as possible */
        &.collapse {
          width: 0.0000000001%;
        }

        :last-child {
          border-right: 0;
        }
      }
    }

    .pagination {
      padding: 0.5rem;
    }
  `;

  const Table = ({ columns, data }) => {
    const [records, setRecords] = React.useState(data);

    const getRowId = React.useCallback((row) => {
      return row.id;
    }, []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      data: records,
      columns,
      getRowId,
    });

    const moveRow = (dragIndex, hoverIndex) => {
      const dragRecord = records[dragIndex];
      setRecords(
        update(records, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRecord],
          ],
        })
      );
    };

    return (
      <DndProvider backend={HTML5Backend}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                <th></th>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>{rows.map((row, index) => prepareRow(row) || <Row index={index} row={row} moveRow={moveRow} {...row.getRowProps()} />)}</tbody>
        </table>
      </DndProvider>
    );
  };

  const DND_ITEM_TYPE = "row";

  const Row = ({ row, index, moveRow }) => {
    const dropRef = React.useRef(null);
    const dragRef = React.useRef(null);

    const [, drop] = useDrop({
      accept: DND_ITEM_TYPE,
      hover(item, monitor) {
        if (!dropRef.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        const hoverBoundingRect = dropRef.current.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        moveRow(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    const [{ isDragging }, drag, preview] = useDrag({
      item: { index },
      type: DND_ITEM_TYPE,
      options: { dropEffect: "copy" },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    const opacity = isDragging ? 0 : 1;
    preview(drop(dropRef));
    drag(dragRef);
    return (
      <tr onDragStart={handler} ref={dropRef} style={{ opacity }}>
        <td ref={dragRef}>{row.id}</td>
        {row.cells.map((cell) => {
          return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
        })}
      </tr>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Case Title",
        accessor: "title",
      },
      {
        Header: "Case No",
        accessor: "caseno",
      },
      {
        Header: "Case Resource",
        accessor: "caseeresource",
      },
      {
        Header: "Case Start",
        accessor: "start",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );
  return (
    <Styles>
      <Table columns={columns} data={CaseItem} />
    </Styles>
  );
};

export default CaseTable;
