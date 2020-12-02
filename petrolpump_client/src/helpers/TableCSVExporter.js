class TableCSVExporter {
  constructor(table) {
    this.table = table;
    this.rows = Array.from(table.querySelectorAll("tr"));
  }

  _findLongestRowLength = () => {
    return this.rows.reduce(
      (l, row) => (row.childElementCount > l ? row.childElementCount : l),
      0
    );
  };

  static parseCell = (tableCell) => {
    let parsedValue = tableCell.textContent;

    parsedValue = parsedValue.replace(/"/g, `""`);

    parsedValue = /[",\n]/.test(parsedValue) ? `"${parsedValue}"` : parsedValue;

    return parsedValue;
  };

  convertToCSV = () => {
    const lines = [];
    const numberOfColumns = this._findLongestRowLength();

    for (const row of this.rows) {
      let line = "";

      for (let i = 0; i < numberOfColumns; i++) {
        if (row.children[i] !== undefined) {
          line += TableCSVExporter.parseCell(row.children[i]);
        }

        line += i !== numberOfColumns - 1 ? "," : "";
      }

      lines.push(line);
    }

    return lines.join("\n");
  };
}

export default TableCSVExporter;
