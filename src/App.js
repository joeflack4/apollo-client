// noinspection NpmUsedModulesInstalled
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './App.css';

// #Component
class App extends Component {
  // (1) I don't understand how 'showTypeMutation' connects to 'changeShow.
  changeShow = type => {
    this.props.mutate({
      variables: { show_type: type }
    });
  };

  render() {
    const { showTypeQuery, allBooksQuery } = this.props;
   
    if (showTypeQuery.loading || allBooksQuery.loading) {
      return <h1>Loading....</h1>;
    }
   
    // noinspection JSUnresolvedVariable
    const books = allBooksQuery.getAllBooks.filter(item => {
      if (showTypeQuery.show_type === 'BELOW_15') {
       // noinspection JSUnresolvedVariable
        return item.price < 15;
      }
      // noinspection JSUnresolvedVariable
      return item.price >= 15;
    });
   
    // noinspection JSUnresolvedVariable
    return (
      <div>
        <h1>Bookstore</h1>
        {books.map(item => (
          <h3 key={item._id}>
            {item.title} - ${item.price}
          </h3>
        ))}
        <button onClick={() => this.changeShow('BELOW_15')}>Below $15</button>
        <button onClick={() => this.changeShow('ABOVE_15')}>Above $15</button>
      </div>
    );
  }
}

// #Queries
const allBooksQuery = gql`
  query allBooksQuery {
    getAllBooks {
      _id
      author
      title
      price
    }
  }
`;

const showTypeQuery = gql`
 query showTypeQuery {
   show_type @client
 }
`;

// (1)
const showTypeMutation = gql`
 mutation showTypeMutation($show_type: String!) {
   changeShowType(show_type: $show_type) @client {
     show_type
   }
 }
`;

// #Export
export default compose(
  graphql(showTypeQuery, { name: 'showTypeQuery' }),
  graphql(allBooksQuery, { name: 'allBooksQuery' }),
  graphql(showTypeMutation)
)(App);
