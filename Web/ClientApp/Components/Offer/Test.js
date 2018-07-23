import React, { Component } from 'react';
import extend from 'lodash';
import { Icon, Item, Label, Button } from 'semantic-ui-react';
import {
    Hits,
    MovieHitsGridItem,
    TopBar,
    Layout,
    LayoutBody,
    SideBar,
    LayoutResults,
    ActionBarRow,
    ActionBar,
    NoHits,
    SearchkitManager,
    SearchkitProvider,
    SelectedFilters,
    ResetFilters,
    HitsStats,
    SearchBox,
    HierarchicalMenuFilter,
    RefinementListFilter
} from 'searchkit';

//const host = "http://demo.searchkit.co/api/movies/"
//const searchkit = new SearchkitManager("http://demo.searchkit.co/api/movies/")
const host = "https://c95e41002b2a3377cbd07f4d7bb0681f.us-east-1.aws.found.io:9243/offers/"
const searchkit = new SearchkitManager(host, {
    multipleSearchers: false,
    basicAuth: "elastic:IC4srhJhI4lsK8qysJAHVoM9"
})

const MovieHitsListItem = (props) => {
    const { bemBlocks, result } = props

    debugger
    let url = "http://www.imdb.com/title/" + result._source.offerId
    //const source = extend({}, result._source, result.highlight)
    return (
            <Item>
                <img src={result._source.image} />
                <Item.Content>
                    <Item.Header as='a'>{result._source.name}</Item.Header>
                    <Item.Description>{result._source.price} {result._source.currency}</Item.Description>
                    <Item.Extra>
                        <Label>{result._source.area}</Label>
                    </Item.Extra>
                </Item.Content>
            </Item>


    )
}

class Test extends Component {
    render() {
        return (
            <SearchkitProvider searchkit={searchkit}>
                <ActionBarRow>
                    <SearchBox
                        autofocus={true}
                        searchOnChange={true}
                        prefixQueryFields={["name^5", "currency^2", "area", "title^10"]} />
                </ActionBarRow>
                    <Hits mod="sk-hits-list" hitsPerPage={10} itemComponent={MovieHitsListItem}
                        sourceFilter={["area", "name", "image", "price", "currency"]} />
                    <NoHits />
                

            </SearchkitProvider>
        );
    }
}

export default Test;