import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import { Icon, Item, Label, Button } from 'semantic-ui-react';

class OfferGrid extends Component {

    render() {
        return (
            <Item.Group divided>
                {this.props.data.map(
                    (item, index) => (
                        <LazyLoad key={index} height={50} offset={[-200, 0]}>
                            <Item>
                                <img src={item.image} />
                                <Item.Content>
                                    <Item.Header as='a'>{item.name}</Item.Header>
                                    <Item.Meta>
                                        <span className='cinema'>{item.are}</span>
                                        <span className='cinema'>{item.price} {item.currency}</span>
                                    </Item.Meta>
                                    <Item.Description>{item.title}</Item.Description>
                                    <Item.Extra>
                                        <Label>Videoadapter</Label>
                                        <Label>Radeon</Label>
                                        <Label>Mining</Label>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </LazyLoad>
                    )
                )}
            </Item.Group>
        );
    }
}

export default OfferGrid;