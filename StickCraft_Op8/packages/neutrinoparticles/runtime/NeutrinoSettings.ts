const {ccclass, property} = cc._decorator;

/**
 * NeutrinoSettings component is a container for default values of NeutrinoComponent
 * properties. Instance of this class should be a singleton in the scope of a scene
 * and has to be accessed only via cc.NeutrinoSettings.instance() static method. This
 * method creates a node with name '__NeutrinoParticles__' in the root of the scene
 * and attaches NeutrinoSettings component to it. Further properties of the component
 * can be changed in the editor or programmatically.
 */

 @ccclass
export default class NeutrinoSettings extends cc.Component {
    @property(cc.Node)
    defaultWorldParent = null;

    @property
    defaultTexturesPrefixPath = '';

    @property(cc.SpriteAtlas)
    defaultSpriteAtlas = null;

    static instance() : NeutrinoSettings {
        const canvas = cc.find('Canvas');
        if (!canvas) {
            return null;
        }

        let settings = canvas.getComponent(NeutrinoSettings);
        if (!settings) {
            settings = canvas.addComponent(NeutrinoSettings);
            settings.defaultWorldParent = canvas;
        }

        return settings;
    }
}

cc.NeutrinoSettings = NeutrinoSettings;