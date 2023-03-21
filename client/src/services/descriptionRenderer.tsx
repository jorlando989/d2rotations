import { DestinyActivityModifierDefinition, DestinyInventoryItemDefinition } from "bungie-api-ts/destiny2";
import { renderBreakerIcons, renderDamageIcons } from "./iconRenderer";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function renderVar(description: string) {
    const renderedDesc = description.replace(/{var:(?:\d{1,10})}/g, "25");
    return renderedDesc;
}

export function renderModifiers(modifiers: (DestinyActivityModifierDefinition | undefined)[] | undefined) {
    if (modifiers === undefined) return;
    return modifiers.map(mod => {
        if (mod === undefined) return null;
        let renderedDescription;
        if (mod.displayProperties.description.includes("{")) {
            renderedDescription = renderVar(
                mod.displayProperties.description
            );
        } else {
            renderedDescription = mod.displayProperties.description;
        }

        if (mod.displayProperties.name === "Champion Foes") {
            renderedDescription =
                renderBreakerIcons(renderedDescription);
        } else if (
            mod.displayProperties.name.includes("Threat") ||
            mod.displayProperties.name.includes("Surge")
        ) {
            renderedDescription =
                renderDamageIcons(renderedDescription);
        }
        return (
            <div key={mod.hash} className='icon-m5'>
                <OverlayTrigger
                    key={mod.hash}
                    placement='top'
                    overlay={
                        <Tooltip id='modifier description'>
                            <b>{mod.displayProperties.name}</b>
                            <hr />
                            {renderedDescription}
                        </Tooltip>
                    }
                >
                    <img
                        src={`https://www.bungie.net${mod.displayProperties.icon}`}
                        className='rewardIcon'
                        alt='mod icon'
                    />
                </OverlayTrigger>
            </div>
        );
    });
}

export function renderRewards(rewardsInfo: (DestinyInventoryItemDefinition | undefined)[]) {
    return rewardsInfo.map(reward => {
        if (reward === undefined) return null;
        return (
            <div className="display-in-row" key={reward.hash}>
                <img src={`https://www.bungie.net${reward.displayProperties.icon}`} className='rewardIcon' alt='reward icon'/>
                {reward.displayProperties.name}
            </div>
        );
    })
}