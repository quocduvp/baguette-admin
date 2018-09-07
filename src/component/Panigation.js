import React, { Component } from "react";
import Pagination from "react-js-pagination";
 
class PanigationCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
  }
 
  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }
 
  render() {
    const { perpage,totalItems,pageRange,changePage } = this.props
    console.log(this.props)
    return (
      <div id="pagination">
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={perpage >= 10 ? perpage : 10}
          totalItemsCount={totalItems >= 0 ? totalItems : 0}
          pageRangeDisplayed={pageRange >= 1 ? pageRange : 1}
          onChange={changePage}
        />
      </div>
    );
  }
}

export default PanigationCustom