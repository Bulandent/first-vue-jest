import { shallowMount } from '@vue/test-utils'
import ToDoList from '@/components/ToDoList'

describe('test ToDoList', () => {
    it('输入框初始值为空字符串', () => {
        const wrapper = shallowMount(ToDoList)
        expect(wrapper.vm.toDoText).toBe('')
    })

    it('待完成列表初始值应该为空数组', () => {
        const wrapper = shallowMount(ToDoList)
        expect(wrapper.vm.toDoList.length).toBe(0)
    })

    it('已完成列表初始值应该为空数组', () => {
        const wrapper = shallowMount(ToDoList)
        expect(wrapper.vm.completedList).toEqual([])
    })

    it('输入框值变化的时候，toDoText应该跟着变化', () => {
        const wrapper = shallowMount(ToDoList)
        wrapper.find('.to-do-text').setValue('晚上要陪妈妈逛超市')
        expect(wrapper.vm.toDoText).toBe('晚上要陪妈妈逛超市')
    })

    it('输入框没有值，敲入回车的时候，无变化', () => {
        const wrapper = shallowMount(ToDoList)
        const length = wrapper.vm.toDoList.length
        const input = wrapper.find('.to-do-text')
        input.setValue('')
        input.trigger('keyup.enter')
        expect(wrapper.vm.toDoList.length).toBe(length)
    })

    it('输入框有值，敲入回车的时候，待完成列表将新增一条数据，同时清空输入框', () => {
        const wrapper = shallowMount(ToDoList)
        const length = wrapper.vm.toDoList.length
        const input = wrapper.find('.to-do-text')
        input.setValue('晚上去吃大餐')
        input.trigger('keyup.enter')
        expect(wrapper.vm.toDoList.length).toBe(length + 1)
        expect(wrapper.vm.toDoText).toBe('')
    })

    it('待完成列表支持编辑功能，编辑后更新toDoList数组', () => {
        const wrapper = shallowMount(ToDoList)
        wrapper.setData({toDoList: ['跑步半小时']})
        wrapper.find('.wait-to-do li').find('input').setValue('绕着公园跑3圈') 
        wrapper.find('.wait-to-do li').find('input').trigger('blur') 
        expect(wrapper.vm.toDoList[0]).toBe('绕着公园跑3圈')
    })

    it('待完成列表点击删除，同时更新toDoList数组', () => {
        const wrapper = shallowMount(ToDoList)
        wrapper.setData({toDoList: ['睡前看一小时书']})
        expect(wrapper.vm.toDoList.length).toBe(1)
        wrapper.find('.wait-to-do li').find('.del').trigger('click')
        expect(wrapper.vm.toDoList.length).toBe(0)
    })

    it('点击待完成列表中某项的已完成按钮，数据对应更新', () => {
        const wrapper = shallowMount(ToDoList)
        wrapper.setData({toDoList: ['中午饭后吃一个苹果']})
        expect(wrapper.vm.toDoList.length).toBe(1)
        expect(wrapper.vm.completedList.length).toBe(0)
        wrapper.find('.wait-to-do li').find('.move').trigger('click')
        expect(wrapper.vm.toDoList.length).toBe(0)
        expect(wrapper.vm.completedList.length).toBe(1)
    })

    it('点击已完成列表中某项的未完成按钮，数据对应更新', () => {
        const wrapper = shallowMount(ToDoList)
        wrapper.setData({completedList: ['唱了一首歌']})
        expect(wrapper.vm.toDoList.length).toBe(0)
        expect(wrapper.vm.completedList.length).toBe(1)
        wrapper.find('.has-completed li').find('.move').trigger('click')
        expect(wrapper.vm.toDoList.length).toBe(1)
        expect(wrapper.vm.completedList.length).toBe(0)
    })

    it('列表序号从1开始递增', () => {
        const wrapper = shallowMount(ToDoList)
        wrapper.setData({toDoList: ['早上做作业', '下午去逛街']})
        expect(wrapper.vm.toDoList.length).toBe(2)
        expect(wrapper.find('.wait-to-do').html()).toMatch('<i>1</i>')
        expect(wrapper.find('.wait-to-do').html()).toMatch('<i>2</i>')
    })

    it('当待完成列表为空的时候，不显示待完成字样', () => {
        const wrapper = shallowMount(ToDoList)
        wrapper.setData({toDoList: []})
        expect(wrapper.find('h4').isVisible()).toBeFalsy()
        wrapper.setData({toDoList: ['明天去爬北山']})
        expect(wrapper.find('h4').isVisible()).toBeTruthy()
    })

    it('当页面挂载的时候去请求数据，请求成功后应该会返回2条数据', (done) => {
        const wrapper = shallowMount(ToDoList)
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.toDoList.length).toBe(2)
            done()
        })
    })
})
